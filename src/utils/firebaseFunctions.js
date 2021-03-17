import { db } from '../config/firebaseConfig';

export default class FirebaseFunctions {
  /**
   * Busca todas as notícias
   *
   * @returns Array com as notícias
   */
  static async getAllNews() {
    return db
      .collection('noticias')
      .orderBy('createdAt', 'desc')
      .get()
      .then(({ docs }) =>
        docs.map((doc) => ({ docId: doc.id, ...doc.data() }))
      );
  }

  /**
   * Busca todas as escolas
   *
   * @returns Array com as escolas
   */
  static async getAllSchools() {
    return db
      .collection('escolas')
      .orderBy('name', 'asc')
      .get()
      .then(({ docs }) =>
        docs.map((doc) => ({ docId: doc.id, ...doc.data() }))
      );
  }

  /**
   * Busca uma notícia a partir do seu docId
   *
   * @param {String} docId docId da notícia
   * @returns
   */
  static async findNews(docId) {
    return db
      .collection('noticias')
      .doc(docId)
      .get()
      .then((doc) => doc.data());
  }

  /**
   * Busca uma escola a partir do seu docId
   *
   * @param {String} docId docId da escola
   * @returns
   */
  static async findSchool(docId) {
    return db
      .collection('escolas')
      .doc(docId)
      .get()
      .then((doc) => doc.data());
  }

  /**
   * Faz uma query e retorna as notícias que contém o id
   *
   * @param {String} id id da notícia
   * @returns
   */
  static async findNewsWithURL(id) {
    return db
      .collection('noticias')
      .where('id', '==', id)
      .get()
      .then(({ docs }) =>
        docs.map((doc) => ({ docId: doc.id, ...doc.data() }))
      );
  }

  /**
   * Faz uma query e retorna as escolas que contém o id
   *
   * @param {String} id id da escola
   * @returns
   */
  static async findSchoolWithURL(id) {
    return db
      .collection('escolas')
      .where('id', '==', id)
      .get()
      .then(({ docs }) =>
        docs.map((doc) => ({ docId: doc.id, ...doc.data() }))
      );
  }
}
