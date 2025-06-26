import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons'

//  props
export default function Wishlist(props) {
    // destructuring props
  const { wishlist, dispatch } = props;

  // as constant variant 2
    // map wishlist items to Wish components
  const itemsMapped = wishlist.map((item, index) => (
      <Wish dispatch={dispatch} item={item} key={index} />
  ));

    // empty wishlist message
  const empty = (
      <tr>
        <td colSpan="4">
          {" "}
          <p className="alert alert-info">Wishlist of Businesstrips is empty</p>
        </td>
      </tr>
  );

  return (
      <div className="container">
        <React.Fragment>
          <div className="row">
            <h2>Wishlist</h2>
            <div className="col-sm-12">
              <div className="card table-responsive">
                <table className="table table-hover shopping-cart-wrap">
                  <thead className="text-muted">
                  <tr>
                    <th scope="col">Trip</th>
                    <th scope="col" width="200">
                      Title
                    </th>
                    <th scope="col" width="200">
                      Like
                    </th>
                    <th scope="col" width="120">
                      Description
                    </th>
                    <th scope="col" width="200" className="text-right">
                      Action
                    </th>
                  </tr>
                  </thead>
                  <tbody>{itemsMapped.length > 0 ? itemsMapped : empty}</tbody>
                  <tfoot>
                  <tr>
                    <th align="right" scope="col" />
                    <th scope="col" />
                    <th scope="col" />
                    <th scope="col">
                        {/* Button to empty the wishlist */}
                      <button
                          className="btn btn-outline-danger"
                          onClick={() => dispatch({ type: "empty" })}
                          disabled={itemsMapped.length === 0}
                      >
                        empty List
                      </button>
                    </th>
                  </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
  );
}

// Wish component to display each item in the wishlist
function Wish(props) {
  // destructuring props
  const { dispatch, item } = props;
  // props
  let { id, title, description, startTrip, endTrip } = item;
  // let { id, title, description, startTrip, endTrip } = props.item;

  return (
      <tr key={id}>
        <td>
          <figure className="media">
            <div className="img-wrap">
              <img
                  className="img-thumbnail img-xs"
                  src={"images/items/" + id + ".jpg"}
                  alt="img"
              />
            </div>
            <figcaption className="media-body">
              <h6 className="h6">{title}</h6>
              <dl className="dlist-inline small">
                <dt>Start:</dt>
                <dd>{startTrip}</dd>
                <dt>End:</dt>
                <dd>{endTrip}</dd>
                <dt>Description:</dt>
                <dd>{description}</dd>
              </dl>
            </figcaption>
          </figure>
        </td>
        <td>
        <span className="media-body">
          <div>{title}</div>
        </span>
        </td>
        <td>
        <span className="media-body">
          <div>
            <FontAwesomeIcon icon={faHeart} className="fa-thin fa-heart"/>
            <span className="wishlist-label">Like</span>
            </div>
        </span>
        </td>
        <td className="price-wrap price"><span className="wishlist-label">Description:</span> {description}</td>
        <td className="text-right">
          <button
              className="btn btn-outline-danger"
              onClick={() => dispatch({ type: "deleteItem", id: props.item.id })} // App deleteItem
          >
            delete Trip
          </button>
        </td>
      </tr>
  );
}
