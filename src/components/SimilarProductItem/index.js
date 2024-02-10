// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {SimilarProductsItemsData} = props

  return (
    <ul className="similarproductslist">
      {SimilarProductsItemsData.map(each => (
        <li className="eachsimilarlist">
          <img src={each.imageUrl} alt={each.title} className="similarimage" />
          <p className="title">{each.title}</p>
          <p className="brand">{`by ${each.brand}`}</p>
          <div className="rupeesstarcontainer">
            <p className="price">{each.price}</p>
            <div className="startcontainer">
              <p className="startext">{each.rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="startimage"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SimilarProductItem
