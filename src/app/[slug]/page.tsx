
import { db } from "../../../prisma";
import { notFound } from "next/navigation";

import Image from "next/image";
import ConsumptionMethodOptions from "./components/consumption-method-optinons";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={100}
          height={100}
        />
        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>
      <div className="text-cent space-y-2 pt-24">
        <h3 className="text-2xl font-semibold text-center">Seja bem-vindo!</h3>
        <p className="opacity-55 text-center">
          Escolja como prefere aproveitar sua refeição. Estamos oferencendo
          praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="pt-14 grid grid-cols-2 gap-4">
        <ConsumptionMethodOptions slug={slug} option="DINE_IN" buttonText="Para comer aqui" imageAlt="Para comer aqui" imageUrl="/dine_in.png"/>
      <ConsumptionMethodOptions slug={slug} option="TAKEWAY" buttonText="Para levar" imageAlt="Para levar" imageUrl="/takeaway.png"/>
      </div>
    </div>
  );
};

export default RestaurantPage;
