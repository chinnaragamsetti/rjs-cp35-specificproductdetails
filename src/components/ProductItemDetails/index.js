// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

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
    cartNo: 1,
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

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()

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
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }

    if (!response.ok) {
      this.setState({
        productItemData: selectedProduct,
        apiStatus: apiStatusConstants.success,
        similarProductsItemsData: similarProductsList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onIncre = () => {
    this.setState(prevState => ({cartNo: prevState.cartNo + 1}))
  }

  onDecre = () => {
    const {cartNo} = this.state

    if (cartNo < 1) {
      this.setState({cartNo: 0})
    } else {
      this.setState(prevState => ({cartNo: prevState.cartNo - 1}))
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
            <div className="starreviewscontainer">
              <div className="starcont">
                <p className="star">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="start"
                  className="starimage"
                />
              </div>
              <p className="reviews">{`${totalReviews} Reviews`}</p>
            </div>
            <p className="description">{description}</p>
            <p className="stock">{`Available: ${availability}`}</p>
            <p className="brand">{`Brand:${brand}`}</p>
            <hr className="hrline" />
            <div className="cartcontainer">
              <button
                type="button"
                className="indcbutton"
                onClick={this.onDecre}
                data-testid="minus"
              >
                <BsDashSquare aria-label="close" className="controllericon" />
              </button>
              <p className="cartno">{cartNo}</p>
              <button
                type="button"
                className="indcbutton"
                onClick={this.onIncre}
                data-testid="plus"
              >
                <BsPlusSquare aria-label="close" className="controllericon" />
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
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failurecontainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failureimage"
      />
      <h1 className="failureimagetext">Product Not Found</h1>
      <button
        type="button"
        className="continueshop"
        onClick={this.onContinueShopping}
      >
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
