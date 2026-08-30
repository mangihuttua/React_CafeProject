function SectionTitle({ title, subtitle }) 
{
  return (
          <div className="text-center mb-10">

            <h2 className="text-4xl font-bold text-stone-800">
              {title}
            </h2>

            <p className="text-gray-600 mt-3 text-xl">
              {subtitle}
            </p>

          </div>
  );
}

export default SectionTitle;