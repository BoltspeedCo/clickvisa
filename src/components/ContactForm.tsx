'use client'
import * as React from 'react'
import { useFormspark } from "@formspark/use-formspark";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Link } from 'lucide-react';
import { Textarea } from './ui/Textarea';
import { kebabCase } from 'change-case';
import { toast } from 'sonner';
type Props = {

}
const FORMSPARK_FORM_ID = "H7AMrmTH";
const services = [
    'corporate',
    'personal',
    'entertainment',
    'visa cancellation',
    'character & health',
    'appeals & tribunal',
    'pic, schedule 3 & waivers',
    'complex matters',
    'citizenship',
    'other'
]
const formSchema = z.object({
    name: z.string().min(2, { message: "Please enter a valid name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    services: z.string().min(2, { message: "Please enter a valid service" }),
    message: z.string().min(1, { message: "Please enter a valid message" }),
})
type ContactFormProps = {
    formsparkId: string
}
const ContactForm = ({ formsparkId }: ContactFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            services: '',
            message: ''
        },
        resolver: zodResolver(formSchema),
    })
    const { formState, handleSubmit, reset } = form
    const [submit, submitting] = useFormspark({
        formId: formsparkId,
    });
    const onSubmitHandler = handleSubmit(async (data) => {
        // toast.success('Successfully submitted! We will be in touch soon')
        await toast.promise(submit(data), {
            loading: 'Submitting...',
            success: 'Successfully submitted! We will be in touch soon',
            error: 'An error occurred, please try again later.'
        });
        reset()

    })
    return (
        <>
            <Form {...form}>
                <form onSubmit={onSubmitHandler} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Last" {...field} disabled={submitting} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4 lg:gap-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=''>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="email@business.com.au" {...field} disabled={submitting} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=''>You can call me on</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+61..." {...field} disabled={submitting} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>Services</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={submitting}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {services.map((service, index) => {
                                            return (
                                                <SelectItem value={kebabCase(service)} key={index}>{service}</SelectItem>
                                            )
                                        })}

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your message" {...field} disabled={submitting} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={'fill'} type="submit" disabled={submitting}>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default ContactForm