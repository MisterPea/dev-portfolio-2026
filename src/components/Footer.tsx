type FooterProps = {
  text?: string;
};

export default function Footer({ text }: FooterProps) {
  if (!text) {
    return null;
  }

  return (
    <footer className="site-footer">
      <p>{text}</p>
    </footer>
  );
}
