export function ModifyForm({
  handleName,
  handlePrice,
  handleStock,
  handleSubmit,
  onClose,
  open,
  handleFile
}) {
    if(!open) return null
  return (
    <>
      <h2> Modify form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleName}></input>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" onChange={handlePrice}></input>
        <label htmlFor="stock">Stock</label>
        <input type="number" name="stock" id="stock" onChange={handleStock}></input>
        <label htmlFor="image">Image File</label>
        <input onChange={handleFile} type="file" name="image" id="image"/>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Close</button>
      </form>
    </>
  );
}
