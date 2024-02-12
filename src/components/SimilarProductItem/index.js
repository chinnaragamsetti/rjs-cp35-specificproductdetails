// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {similarProductsItemsData} = props

  return (
    <ul className="similarproductslist">
      {similarProductsItemsData.map(each => (
        <li className="eachsimilarlist" key={each.id}>
          <img
            src={each.imageUrl}
            alt="similar product"
            className="similarimage"
          />
          <p className="title">{each.title}</p>
          <p className="brand">{`by ${each.brand}`}</p>
          <div className="rupeesstarcontainer">
            <p className="price">{each.price}</p>
            <div className="starcontainer">
              <p className="startext">{each.rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="starimage"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SimilarProductItem
