export function ChangePassword({
  open,
  children,
  onClose,
  handlePassword,
  handlePasswordRepeat,
  handleSubmit,
  field
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      <h1>Change Password</h1>
      {children}
      <form onSubmit={handleSubmit}>
        <label htmlFor={field}>new password:</label>
        <input
          type="text"
          name={field}
          id={field}
          onChange={handlePassword}
        ></input>
       
        <label htmlFor="password-repeat">type new password again:</label>
        <input
          type="text"
          name="password-repeat"
          id="password-repeat"
          onChange={handlePasswordRepeat}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </>
  );
}
