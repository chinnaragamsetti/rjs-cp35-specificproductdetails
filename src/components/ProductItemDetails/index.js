// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productItemData: {},
    apiStatus: apiStatusConstants.initial,
    similarProductsItemsData: [],
    cartNo: 0,
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      `http://localhost:3000/products/${id}`,
      options,
    )
    const data = response.json()
    const similarProductsList = data.similar_products.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      title: each.title,
      style: each.style,
      price: each.price,
      description: each.description,
      brand: each.brand,
      totalReviews: each.total_reviews,
      rating: each.rating,
      availability: each.availability,
    }))

    const selectedProduct = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }
    if (response.ok === true) {
      this.setState({
        productItemData: selectedProduct,
        apiStatus: apiStatusConstants.success,
        similarProductsItemsData: similarProductsList,
      })
    }

    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProductItemDetails = () => {
    const {productItemData, cartNo, similarProductsItemsData} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productItemData

    return (
      <div className="selectedProductcontainer">
        <div className="topcontainer">
          <img src={imageUrl} alt={title} className="mainimage" />
          <div className="selectedtextcontainer">
            <h1 className="embhead">{title}</h1>
            <p className="price">{`Rs ${price}`}</p>
            <div className="starreviescontainer">
              <div className="startcont">
                <p className="star">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="start"
                  className="startimage"
                />
              </div>
              <p className="reviews">{`${totalReviews} Reviews`}</p>
            </div>
            <p className="description">{description}</p>
            <p className="stock">{`Available: ${availability}`}</p>
            <p className="brand">{`Brand:${brand}`}</p>
            <hr className="hrline" />
            <div className="cartcontainer">
              <button type="button" className="indcbutton">
                -
              </button>
              <p className="cartno">{cartNo}</p>
              <button type="button" className="indcbutton">
                +
              </button>
            </div>
            <button type="button" className="addbutton">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="bottomcontainer">
          <p className="similarhead">Similar Products</p>
          <SimilarProductItem
            similarProductsItemsData={similarProductsItemsData}
          />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failurecontainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="failureimage"
      />
      <p className="failureimagetext">Product Not Found</p>
      <button type="button" className="continueshop">
        Continue Shopping
      </button>
    </div>
  )

  renderProductitemswitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="productitemcontainer">
        <Header />
        {this.renderProductitemswitch()}
      </div>
    )
  }
}

export default ProductItemDetails
