import React from 'react'
import { Row, Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import AlertMessage from "./AlertMessage";
import Spinner from "react-bootstrap/Spinner";

const ItemsList = ({ items, itemName, loading, allertMessage, header }) => {

  return (
    <div className='container-fluid'>
      {loading && <Spinner animation='grow' />}
      {items && items.length === 0 && <AlertMessage variant='info' message={allertMessage} />}
      {items && items.length > 0 && (
        <div>
          <h4>{header}</h4>
          <Row className='g-4'>
            {items.map((item) => (
              <Col key={item.id} md={6} sm={12} lg={4}>
                <ItemCard item={item} itemName={itemName} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  )
}

export default ItemsList