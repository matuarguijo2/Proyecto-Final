export const metadata = {
  title: "Conoce Más",
  description: "Conoce Más | Proyecto Final",
};

export default function ConoceMasLayout({ children }) {
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-8">
      <p className="mb-6 text-lg text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, culpa?
      </p>
      {children}
    </div>
  );
}
