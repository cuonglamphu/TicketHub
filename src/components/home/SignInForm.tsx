'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"


// 

export default function SignInForm({ onClose }: { onClose: () => void } ) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: ''
        };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if(formData.email === '1@gmail.com' && formData.password === '1') {
                const TWO_HOURS = 2 * 60 * 60 * 1000;
                const currentTime = Math.floor(Date.now() / TWO_HOURS) * TWO_HOURS;
                const expirationDate = new Date(currentTime + TWO_HOURS);
                
                localStorage.setItem('user', JSON.stringify({
                    id: '1',
                    email: formData.email,
                    expiresAt: expirationDate.getTime(),
                    firstName: 'John',
                    lastName: 'Doe'
                }));
                onClose();
            } else if(formData.email === '2@gmail.com' && formData.password === '2') {
                const expirationDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
                localStorage.setItem('user', JSON.stringify({
                    id: '2',
                    email: formData.email,
                    expiresAt: expirationDate.getTime(),
                    firstName: 'Jane',
                    lastName: 'Doe'
                })); 
                onClose();    
            } else {
                console.log('Invalid email or password');
                setErrors({ email: 'Invalid email or password', password: 'Invalid email or password' });
            }
            
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`
                    w-full
                    bg-white/90 backdrop-blur-sm
                    text-black placeholder-gray-600
                    text-lg py-6
                    transition-all duration-300
                    hover:bg-white focus:bg-white
                    ${pixelBorder}
                    text-xl
                    font-pixelify
                    ${errors.email ? 'border-red-500' : ''}
                `}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-xl">{errors.email}</p>}
        </div>
        <div>
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`
                    w-full
                    bg-white/90 backdrop-blur-sm
                    text-black placeholder-gray-600
                    text-lg py-6
                    transition-all duration-300
                    hover:bg-white focus:bg-white
                    ${pixelBorder}
                    text-xl
                    font-pixelify
                    ${errors.password ? 'border-red-500' : ''}
                `}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 text-xl">{errors.password}</p>}
        </div>
        <div className="flex justify-end">
            <Button
                variant="link"
                className="text-[#FFEB3B] hover:text-[#FDD835] text-xl"
            >
                Forgot Password?
            </Button>
        </div>
        <Button
            type="submit"
            className={`
                w-full
                bg-gradient-to-r from-[#FFD600] to-[#FFEB3B]
                text-black text-lg font-bold
                transition-all duration-300
                hover:from-[#FDD835] hover:to-[#FFD600]
                hover:shadow-[6px_6px_0_0_#000000]
                active:translate-y-1
                ${pixelBorder}
                text-xl
            `}
        >
            Sign In
        </Button>
    </form>
}