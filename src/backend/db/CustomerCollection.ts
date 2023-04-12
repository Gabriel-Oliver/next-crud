import Customer from "@/core/Customer";
import CustomerRepo from "@/core/CustomerRepo";
import firebase from "../config";

export default class CustomerCollection implements CustomerRepo {
  #converter = {
    toFirestore(customer: Customer) {
      return {
        name: customer.name,
        age: customer.age,
        avatarPath: customer.avatar ? `${customer.avatar?.name}` : "",
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ): Customer {
      const data = snapshot.data(options);
      return new Customer(data.name, data.age, data.avatar, snapshot.id);
    },
  };

  async create(customer: Customer): Promise<Customer | undefined> {
    if (customer?.id) {
      await this.collection().doc(customer.id).set(customer);
      return customer;
    } else {
      const docRef = await this.collection().add(customer);
      if (customer.avatar) {
        const storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child(
          `customers/${docRef.id}/${customer.avatar?.name}`
        );
        await mountainImagesRef.put(customer.avatar!);
      }
      const doc = await docRef.get();
      return doc.data();
    }
  }
  async delete(customer: Customer): Promise<void> {
    return this.collection().doc(customer.id).delete();
  }
  async findAll(): Promise<Customer[]> {
    const query = await this.collection().get();
    const customers = query.docs.map((doc: any) => doc.data()) ?? [];
    return customers;
  }

  private collection() {
    return firebase
      .firestore()
      .collection("customers")
      .withConverter(this.#converter);
  }
}
