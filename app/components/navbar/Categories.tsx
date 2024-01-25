'use client';

import { GiBoatFishing, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool} from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";

export const categories=[
    {
        label: 'Yeldeğirmenleri',
        icon:GiWindmill,  
        description: "Bu ev yeldeğirmenlerine yakın bir konumdadır"
      },
      {
        label: 'Merkezi',
        icon:MdOutlineVilla,  
        description: "Bu ev şehir merkezine yakın bir konumdadır"
      },
      {
        label: 'Göl',
        icon:GiBoatFishing,  
        description: "Bu ev göl kenarında bulunmaktadır"
      },
    {
      label: 'Sahil',
      icon:TbBeach,  
      description: "Bu ev sahile yakın bir konumdadır"
    },
    {
        label: 'Kayak',
        icon:FaSkiing,  
        description: "Bu ev kayak merkezine yakın bir konumdadır"
      },
    {
        label: 'Dağ',
        icon:TbMountain,  
        description: "Kır evi"
      },
      {
        label: 'Havuzlu',
        icon:TbPool,  
        description: "Bu evde havuz bulunmaktadır"
      },
      {
        label: 'Adalar',
        icon:GiIsland,  
        description: "Bu ev adada bulunmaktadır"
      },
      {
        label: 'Kamp',
        icon:GiForestCamp,  
        description: "Bu ev kamp alanına yakın bir konumdadır"
      },
      {
        label: 'Sahil',
        icon:TbBeach,  
        description: "Bu ev sahile yakın bir konumdadır"
      },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');   
    const pathname = usePathname();
    const isHome = pathname === '/';

    if(!isHome){
        return null;
    }

    return ( 
        <Container>
            <div
                className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                "
            >
             {categories.map((item)=> (
                <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
                />
             ))}
            </div>
        </Container>
     );
}
 
export default Categories;