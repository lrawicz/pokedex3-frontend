import { Flex, Row, Slider } from "antd"
import type { SliderSingleProps } from 'antd';
import { RangedCollapse } from "../inputs/RangedCollapse/RangedCollapse";
export const STATS: React.FC = () => {
    
    const marks: SliderSingleProps['marks'] = {
        0: '0',
        50: '50',
        80: '80',
        100: '100',
        150: '150',
        180: '180',
        200: '200',
        230: '230',
        255: '255',
        
      };
    return(
        
        <>
            <RangedCollapse name="hp" min={0} max={255} marks={[0,60,80,120,140,255]}/>
            <RangedCollapse name="attack" min={0} max={255} marks={[0,60,80,120,140,255]}/>
            <RangedCollapse name="defense" min={0} max={255} marks={[0,60,80,120,140,255]}/>
            <RangedCollapse name="special-attack" min={0} max={255} marks={[0,60,80,120,140,255]}/>
            <RangedCollapse name="special-defense" min={0} max={255} marks={[0,60,80,120,140,255]}/>
            <RangedCollapse name="speed" min={0} max={255} marks={[0,60,80,120,140,255]}/>
        

        </>
    )
}