import { Collapse } from "antd"
import { Move } from "./Move/Move";

export const Moves: React.FC = () => {
    const items: any = [
        {
          key: '1',
          label: 'Move 1',
          children: <Move/>,
        },
        {
          key: '2',
          label: 'Move 2',
          children: <Move/>,
        },
        {
          key: '3',
          label: 'Move 3',
          children: <Move/>,
        },
        {
            key: '4',
            label: 'move 4',
            children: <Move/>,
          },
      ];
    return(
        <>
        <Collapse items={items} defaultActiveKey={['1']} />
        </>
    )
}