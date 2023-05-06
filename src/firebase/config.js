import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, doc } from 'firebase/firestore'

const firebaseConfig = {
  // Variable de entorno Vercel "API_KEY"
  apiKey: process.env.API_KEY,
  authDomain: "ag-cursos-13919.firebaseapp.com",
  projectId: "ag-cursos-13919",
  storageBucket: "ag-cursos-13919.appspot.com",
  messagingSenderId: "696913075873",
  appId: "1:696913075873:web:a62a8062e3182247e61ae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*========================================================
 Funciones de interacción con Firebase
========================================================*/
//Consultar BDD
const bdd = getFirestore(app)
/*
    CREATE --> post
    READ --> get
    UPDATE --> put
    DELETE --> delete
*/

// Operaciones de cursos y categorías


// Carga todos los cursos del archivo JSON
export const createProducts = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        //Si existe la coleccion te agrega nuevos productos a la misma, sino crea la coleccion y envia los productos del JSON.
        await addDoc(collection(bdd, "productos"), {
            id: prod.id,
            idCat: prod.idCat,
            nombre: prod.nombre,
            dias: prod.dias,
            horas: prod.horas,
            precio: prod.precio,
            vacantes: prod.vacantes,
            img: prod.img,
            imgDetalle: prod.imgDetalle
        })
    })

}

// Carga todas las categorias del archivo JSON
export const createCategories = async () => {
    const promise = await fetch('./json/categorias.json')
    const cats = await promise.json()
    cats.forEach(async (prod) => {
        //Si existe la coleccion te agrega nuevos productos a la misma, sino crea la coleccion y envia los productos del JSON.
        await addDoc(collection(bdd, "categorias"), {
            id: prod.id,
            nombre: prod.nombre
        })
    })

}

// Consulta de todos los documentos (registros) de "categorias" dentro de Firestore
export const getCats = async () => {
    const categories = await getDocs(collection(bdd, "categorias"))
    const cats = categories.docs.map(record => {
        return { ...record.data() }//, idF: record.id }
    })
    return cats
}

// Consulta un sólo documento (registro) de "categorias" dentro de Firestore
export const getCat = async (id) => {
    const category = await getDoc(doc(bdd, "categorias", id))
    const cat = { ...category.data() } //, idF: category.id }
    return cat
}

// Consulta de todos los documentos (registros) de "cursos" dentro de Firestore
export const getProducts = async () => {
    const prods = await getDocs(collection(bdd, "cursos"))
    const items = prods.docs.map(prod => {
        return { ...prod.data(), idF: prod.id }
    })
    return items
}

// Consulta un sólo documento (registro) de "cursos" dentro de Firestore
export const getProduct = async (id) => {
    const prod = await getDoc(doc(bdd, "cursos", id))
    const item = { ...prod.data(), idF: prod.id }
    return item
}

//Tanto Update como Delete no devuelven un estado
export const updateProduct = async (id, info) => {
    await updateDoc(doc(bdd, "cursos", id), info)
}

export const deleteProduct = async (id) => {
    await deleteDoc(doc(bdd, "cursos", id))
}

// CREATE y READ OrdenCompra
export const createOrdenCompra = async (cliente, precioTotal, carrito, fecha) => {
    const ordenCompra = await addDoc(collection(bdd, "ordenCompra"), {
        cliente: cliente,
        items: carrito,
        precioTotal: precioTotal,
        fecha: fecha
    })
    return ordenCompra
}

export const getOrdenCompra = async (id) => {
    const ordenCompra = await getDoc(doc(bdd, "ordenCompra", id))
    const item = { ...ordenCompra.data(), id: ordenCompra.id }
    return item
}

export const deleteOrdenCompra = async (id) => {
    await deleteDoc(doc(bdd, "ordenCompra", id))
}