import Image from "next/image";
import Link from "next/link";

export interface CardProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  badge?: string;
  badgeColor?: "red" | "orange" | "green";
  href?: string;
  category?: string;
  isNew?: boolean;
}

export default function Card({
  title,
  description,
  price,
  image,
  badge,
  badgeColor = "red",
  href,
  category,
  isNew = false,
}: CardProps) {
  const badgeColorClasses = {
    red: "bg-red text-white",
    orange: "bg-orange text-white",
    green: "bg-green text-white",
  };

  const cardContent = (
    <div className="group relative bg-light-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square bg-light-200">
        {isNew && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-md text-sm font-medium bg-dark-900 text-white z-10">
            New
          </div>
        )}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="p-4 bg-light-100">
        {category && (
          <p className="text-sm text-dark-700 font-medium mb-1">{category}</p>
        )}
        <h3 className="text-lg font-bold text-dark-900 mb-1 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-dark-700 mb-2 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold text-dark-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
