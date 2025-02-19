/* eslint-disable @typescript-eslint/no-explicit-any */


import { db } from "../../../../prisma"

import { notFound } from "next/navigation"

import RestaurantHeader from "./components/header"

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}
const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ['DINE_IN', 'TAKE_AWAY'].includes(consumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
    const {slug} = await params
    const {consumptionMethod} = await searchParams
    if(!isConsumptionMethodValid(consumptionMethod)){
        return notFound()
    }
    const restaurant = await db.restaurant.findUnique({where: {slug}})
    return (
        <div>
            <RestaurantHeader restaurant={restaurant as any } />

        </div>
     );
}
 
export default RestaurantMenuPage;