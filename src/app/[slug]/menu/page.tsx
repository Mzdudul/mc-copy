
import { db } from "../../../../prisma"

import { notFound } from "next/navigation"

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
    return ( <h1>{slug} {consumptionMethod}</h1> );
}
 
export default RestaurantMenuPage;