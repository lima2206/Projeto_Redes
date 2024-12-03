const API_URL = `http://10.0.0.1/items/`; // Atualize aqui se sua rota for diferente ou com o ip da máquina

// DOM elements
const itemForm = document.getElementById('itemForm');
const itemTitle = document.getElementById('itemTitle');
const itemDescription = document.getElementById('itemDescription');
const itemList = document.getElementById('itemList');

// Fetch and display items on page load
window.addEventListener('DOMContentLoaded', fetchItems);

// Handle form submission for adding items
itemForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newItem = {
    name: itemTitle.value,
    description: itemDescription.value,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const createdItem = await response.json();
      addItemToDOM(createdItem);
      itemTitle.value = '';
      itemDescription.value = '';
    } else {
      console.error('Failed to add item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Fetch all items from the backend
async function fetchItems() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const items = await response.json();
      items.forEach(addItemToDOM);
    } else {
      console.error('Failed to fetch items');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Add an item to the DOM
function addItemToDOM(item) {
  console.log(item)
  const listItem = document.createElement('li');
  listItem.className = 'list-item';
  listItem.dataset.id = item.id; // Store the item's ID
  console.log(listItem)

  // Create content container
  const itemContent = document.createElement('div');
  itemContent.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;

  // Create button group
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'button-group';

  // Update button
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Atualizar';
  updateButton.addEventListener('click', () => updateItem(listItem, item));

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Deletar';
  deleteButton.addEventListener('click', () => deleteItem(listItem));

  buttonGroup.appendChild(updateButton);
  buttonGroup.appendChild(deleteButton);

  listItem.appendChild(itemContent);
  listItem.appendChild(buttonGroup);

  itemList.appendChild(listItem);
}

// Update an item
async function updateItem(listItem, currentItem) {
  const newTitle = prompt('Atualizar Nome:', currentItem.name);
  const newDescription = prompt('Atualizar Descrição:', currentItem.description);

  if (!newTitle || !newDescription) return;

  const updatedItem = { name: newTitle, description: newDescription };
  const itemId = listItem.dataset.id;

  try {
    const response = await fetch(`${API_URL}${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      const updatedData = await response.json();
      listItem.querySelector('div').innerHTML = `<strong>${updatedData.name}</strong>: ${updatedData.description}`;
    } else {
      console.error('Failed to update item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Delete an item
async function deleteItem(listItem) {
  const itemId = listItem.dataset.id;

  try {
    const response = await fetch(`${API_URL}${itemId}`, { method: 'DELETE' });
    if (response.ok) {
      listItem.remove();
    } else {
      console.error('Failed to delete item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
