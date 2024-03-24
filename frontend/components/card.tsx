import { Card, CardBody, CardHeader, Textarea, Divider} from '@nextui-org/react'


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    email: string;
    profile:string;
}

function card({...props}: Props)
{
    return(
        <Card isHoverable={true} shadow='md'>
            <CardHeader>
                <Textarea placeholder='Enter your name:' onChange={(e) => e.target.value}>{props.name}</Textarea>
                <Textarea placeholder='Enter your email:' onChange={(e) => e.target.value}>{props.email}</Textarea>
            </CardHeader>
            <Divider orientation='horizontal'/>
            <CardBody>
                <Textarea placeholder='Enter your profile:' onChange={(e) => e.target.value}>{props.profile}</Textarea>
            </CardBody>
        </Card>
    )
}
export default card;



    