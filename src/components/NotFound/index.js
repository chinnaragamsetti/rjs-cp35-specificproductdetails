import {withRouter} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const NotFound = props => {
  const onClickContinueShopping = () => {
    const {history} = props
    //   Cookies.remove('jwt_token')
    history.replace('/')
  }
  return (
    <div>
      <Header />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="not found"
          className="not-found-img"
        />
        <p className="notfoundpara">Product Not Found</>
        <button
          className="continuebutton"
          type="button"
          onClick={onClickContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
export default withRouter(NotFound)
