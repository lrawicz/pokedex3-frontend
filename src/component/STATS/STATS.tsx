import { Flex, Row, Slider } from "antd"
import type { SliderSingleProps } from 'antd';
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
        <Flex align="top">
        hp:<Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>
        <Flex align="top">
        attack: <Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>
        <Flex align="top">
        defense:
        <Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>

        <Flex align="top">
            special-attack:
        <Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>
        
        <Flex align="top">
            speciañ-defense:
        <Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>

        <Flex align="top">
            speed:
        <Slider range defaultValue={[80, 120]} max={255} min={0} style={{width:"40vw"}} marks={marks} step={5}   />
        </Flex>

        </>
    )
}