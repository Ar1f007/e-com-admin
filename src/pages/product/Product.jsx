import { Link, useParams } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { userRequest } from '../../config/axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../config/firebase';
import { updateProduct } from '../../redux/api';
import { updateProductStart } from '../../redux/productSlice';

export default function Product() {
  const { productId } = useParams();
  const [productState, setProductState] = useState([]);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.products.isFetching);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(','));
  };
  const handleColors = (e) => {
    setColors(e.target.value.split(','));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!file || !inputs || !colors || !size || !categories) return;

    const filename = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        dispatch(updateProductStart());
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert('Could not upload image');
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories, color: colors, size };

          console.log(product);
          updateProduct(dispatch, productId, product);
        });
      }
    );
  };
  const MONTHS = useMemo(
    () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    []
  );

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await userRequest.get('/orders/monthlyIncome?productId=' + productId);

        const list = res.data.sort((a, b) => a._id - b._id);

        list.map((item) =>
          setProductState((prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }])
        );
      } catch (error) {}
    };

    getState();
  }, [MONTHS, productId]);

  const product = useSelector((state) => state.products.products.find((p) => p._id === productId));

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productState} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" placeholder={product.title} onChange={handleChange} />
            <label>Product Description</label>
            <input name="desc" type="text" placeholder={product.desc} onChange={handleChange} />
            <label>Price</label>
            <input name="price" type="text" placeholder={product.price} onChange={handleChange} />
            <label>Colors</label>
            <input
              name="color"
              type="text"
              placeholder={product.color.map((c) => c)}
              onChange={handleColors}
            />

            <label>Categories</label>
            <input
              name="categories"
              type="text"
              placeholder={product.categories.map((c) => c)}
              onChange={handleCategories}
            />

            <label>Size</label>
            <input
              name="categories"
              type="text"
              placeholder={product.size.map((s) => s)}
              onChange={handleSize}
            />

            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              onClick={handleClick}
              disabled={updating}
              className="productButton"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
