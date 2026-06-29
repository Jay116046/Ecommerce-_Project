import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText,isBtnDisabled }) {

    function renderInputbyComponentType(getControlItem) { 

        let element = null;

        const val = formData[getControlItem.name] || '';        

        switch (getControlItem.componenttype) {
            case 'input':
                element = (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={val}
                    onChange={e => {setFormData({
                        ...formData, [getControlItem.name]: e.target.value
                    });
                    
                }}
                />)
                break;

            case 'select':

                element = (
                    <Select
                        onValueChange={(value) => {
                            setFormData({
                                ...formData, [getControlItem.name]: value
                            })
                            console.log(value);
                        }}
                        value={val}
                    >
                        <SelectTrigger className='w-full '>
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>

                        <SelectContent className='bg-slate-300 mt-9 p-2'>
                            <SelectGroup>
                                {
                                getControlItem.options && getControlItem.options.length > 0
                                    ? getControlItem.options.map((optionItem) => (
                                        <SelectItem key={optionItem.id} value={optionItem.id}>
                                            {optionItem.label}
                                        </SelectItem>
                                    )) : null
                            }
                            </SelectGroup>
                            
                        </SelectContent>
                    </Select>)
                break;


            case 'textarea':
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={val}
                        onChange={e => setFormData({
                            ...formData, [getControlItem.name]: e.target.value
                        })}
                    />
                )
                break;

            default:
                element = (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={val}
                    onChange={e => setFormData({
                        ...formData, [getControlItem.name]: e.target.value
                    })}
                />)
                break;
        }
        return element
    }

    return (
        <>
            <form action="" onSubmit={onSubmit} className="p-2">

                <div className="flex flex-col gap-3">
                    {
                        formControls.map((controlItem) => (
                            <div className="grid w-full gap-1.5" key={controlItem.name}>
                                <Label className="mb-1">
                                    {controlItem.label}
                                </Label>
                                {
                                    renderInputbyComponentType(controlItem)
                                }
                            </div>
                        ))
                    }
                </div>
                <Button className='mt-2 w-full bg-black text-white'
                disabled={isBtnDisabled}
                >{buttonText || 'Submit'}</Button>
            </form>

        </>)
}


export default CommonForm