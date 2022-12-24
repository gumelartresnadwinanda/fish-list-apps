export const fishesListHeader = [
  {
    name: 'no',
    value: 'No'
  },
  {
    name: 'komoditas',
    value: 'Komoditas',
    sortable: true
  },
  {
    name: 'area_kota',
    value: 'Kota',
    sortable: true
  },
  {
    name: 'area_provinsi',
    value: 'Provinsi',
    sortable: true
  },
  {
    name: 'price',
    value: 'Harga',
    sortable: true
  },
  {
    name: 'size',
    value: 'Ukuran',
    sortable: true
  },
  {
    name: 'timestamp',
    value: 'Waktu',
    sortable: true
  },
  {
    name: 'action',
    value: 'Aksi'
  }
];

export const stringValueHeader = [
  'komoditas', 'area_provinsi', 'area_kota'
];

export const numberValue = [
  'price', 'size'
]


export const titleMapping = {
  'area_provinsi': 'Provinsi',
  'area_kota': 'Kota',
  'komoditas': 'Komoditas',
  'price': 'Harga',
  'size': 'Ukuran'
}

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "411px",
    width: "90%",
    maxHeight: "100vh"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.75)"
  }
};  

export const defaultData = {
  uuid: '',
  komoditas: '',
  area: '',
  price: '',
  size: ''
};

export const cacheName = "fishCache";
