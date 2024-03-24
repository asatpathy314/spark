import { Card, CardBody, CardHeader, Divider} from '@nextui-org/react'
import { title } from "@/components/primitives";
import { Link } from '@nextui-org/react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name : string;
    email : string;
    link : string;
    college : string;
}

function CustomCard({...props}: Props)
{
    return(
        <Card className = "py-3" isHoverable={true} shadow='md'>
            <CardHeader>
                <h1 className={title()}>{props.name}</h1>
            </CardHeader>
            <Divider orientation = 'horizontal'/>
            <CardBody>
            <p>{props.email}</p>
            </CardBody>
            <Divider orientation='horizontal'/>
            <CardBody>
            <Link href={props.link} underline="always">LinkedIn</Link>
            </CardBody>
            <Divider orientation='horizontal'/>
            <CardBody>
            <p>{props.college}</p>
            </CardBody>
        </Card>
    )
}
export default CustomCard;



    