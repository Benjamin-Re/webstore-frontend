export function ChangeAddress({
  open,
  children,
  onClose,
  handleChange,
  handleSubmit,
  field,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <h1>Change Address</h1>
      {children}
      <form onSubmit={handleSubmit}>
        <label htmlFor={field}>{field}:</label>
        <input
          type="text"
          name={field}
          id={field}
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
}
