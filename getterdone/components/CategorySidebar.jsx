import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

export default function CategorySidebar({ categories, addCategory, selectCategory, selectedCategory }) {
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      addCategory(newCategory);
      setNewCategory("");
      setIsModalOpen(false);
    }
  };

  const handleSelectCategory = (category) => {
    if (category === "All") {
      selectCategory(null); // Show all categories
    } else {
      selectCategory(category);
    }
  };

  return (
    <aside className="col-3 p-4 border-end bg-light shadow-sm">
      <h2 className="h5 fw-bold">Categories</h2>
      <ul className="list-group mb-3">
        <li
          className={`list-group-item ${selectedCategory === null ? "active" : ""}`}
          style={{ backgroundColor: selectedCategory === null ? "#005c59" : "", color: selectedCategory === null ? "white" : "" }}
          onClick={() => handleSelectCategory("All")}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`list-group-item ${category === selectedCategory ? "active" : ""}`}
            style={{ backgroundColor: category === selectedCategory ? "#005c59" : "", color: category === selectedCategory ? "white" : "" }}
            onClick={() => handleSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-sm" style={{ backgroundColor: "#005c59", color: "white" }} onClick={() => setIsModalOpen(true)}>+</button>
      </div>
      <div className="mt-3">
        <Link to="/calendar" className="btn btn-outline-secondary w-100">View Calendar</Link>
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" style={{ backgroundColor: "#005c59", borderColor: "#005c59" }} onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}
