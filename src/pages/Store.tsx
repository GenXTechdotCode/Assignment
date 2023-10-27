import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"
import { Form } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";


export function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredItems = storeItems
    .filter(item => {
      if(categoryFilter === 'all') return true;
      return item.category === categoryFilter;
    }) 
    .filter(item => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
      <>
        <Dropdown className="pb-4">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            All
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCategoryFilter('automotive')}>
              Automotive
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategoryFilter('cloths')}>
              Cloths
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategoryFilter('lifestyle')}>
              Lifestyle
          </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form className="pb-4" >
          <Form.Control 
            
            type="text" 
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </Form>
  
        <Row md={1} xs={1} lg={2} className="g-3" >
          {filteredItems.map(item => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </>
    )
  }
