const db = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products WHERE user_id = ?', [req.user.id]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, category, quantity, price } = req.body;
  try {
    await db.query(
      'INSERT INTO products (user_id, name, category, quantity, price) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, category, quantity, price]
    );
    res.status(201).json({ message: 'Product added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, category, quantity, price } = req.body;
  const { id } = req.params;
  try {
    await db.query(
      'UPDATE products SET name = ?, category = ?, quantity = ?, price = ? WHERE id = ? AND user_id = ?',
      [name, category, quantity, price, id, req.user.id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM products WHERE id = ? AND user_id = ?', [id, req.user.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
