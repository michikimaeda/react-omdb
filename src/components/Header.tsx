type HeaderProps = {
  text: string;
};
const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
