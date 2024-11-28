'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { authService } from "@/services/authService";

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]"
const pixelFont = { fontFamily: "'Pixelify Sans', sans-serif" }

// Thêm interface cho response
interface RegisterResponse {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userRole: string;
    userJoinDate: string;
    totalTickets: number;
    totalSpent: number;
    status: 'success' | 'error';
    message: string;
}

interface ApiError {
    response?: {
        data: {
            status: 'error';
            message: string;
            errors?: Record<string, string>;
        };
    };
    message: string;
}

export default function SignUpForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: '',
        terms: ''
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: ''
        };

        if (!formData.userName.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!formData.userEmail.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.userPassword) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.userPassword.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.userPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const signUpData = {
                    userName: formData.userName,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    userEmail: formData.userEmail,
                    userPassword: formData.userPassword,
                    confirmPassword: formData.confirmPassword
                };

                const response = await authService.register(signUpData) as RegisterResponse;
                
                if (response.status === 'error') {
                    toast.error(response.message);
                    
                    if (response.message.includes('Email')) {
                        setErrors(prev => ({
                            ...prev,
                            email: response.message
                        }));
                    } else if (response.message.includes('Username')) {
                        setErrors(prev => ({
                            ...prev,
                            username: response.message
                        }));
                    }
                    return;
                }

                const loginData = {
                    userEmail: formData.userEmail,
                    userPassword: formData.userPassword
                };

                const loginResponse = await authService.login(loginData);

                if (loginResponse) {
                    toast.success('Registration successful! You are now logged in.');
                    onClose();
                    window.location.reload();
                }
            } catch (error: unknown) {
                console.error('Registration error:', error);
                
                // Type guard để kiểm tra error
                const isApiError = (error: unknown): error is ApiError => {
                    return (
                        typeof error === 'object' &&
                        error !== null &&
                        'response' in error &&
                        error.response !== undefined
                    );
                };
                
                if (isApiError(error)) {
                    if (error.response?.data) {
                        const errorData = error.response.data;
                        
                        if (errorData.status === 'error') {
                            toast.error(errorData.message);
                            
                            if (errorData.message.includes('Email')) {
                                setErrors(prev => ({
                                    ...prev,
                                    email: errorData.message
                                }));
                            } else if (errorData.message.includes('Username')) {
                                setErrors(prev => ({
                                    ...prev,
                                    username: errorData.message
                                }));
                            }
                        } else if (errorData.errors) {
                            const serverErrors = errorData.errors;
                            const newErrors = { ...errors };
                            
                            Object.keys(serverErrors).forEach(key => {
                                const errorKey = key.toLowerCase();
                                if (errorKey in newErrors) {
                                    newErrors[errorKey as keyof typeof errors] = serverErrors[key];
                                }
                            });
                            
                            setErrors(newErrors);
                            toast.error('Please check the form for errors.');
                        }
                    }
                } else {
                    toast.error('An error occurred during registration. Please try again.');
                }
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldMapping: { [key: string]: string } = {
            username: 'userName',
            email: 'userEmail',
            password: 'userPassword',
            firstName: 'firstName',
            lastName: 'lastName',
            confirmPassword: 'confirmPassword'
        };

        const stateField = fieldMapping[name] || name;
        
        setFormData(prev => ({
            ...prev,
            [stateField]: value
        }));
    };

    return <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.userName}
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
                    ${errors.username ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1 text-xl">{errors.username}</p>}
        </div>
        <div>
            <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
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
                    ${errors.firstName ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1 text-xl">{errors.firstName}</p>}
        </div>
        <div>
            <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
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
                    ${errors.lastName ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1 text-xl">{errors.lastName}</p>}
        </div>
        <div>
            <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.userEmail}
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
                    ${errors.email ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-xl">{errors.email}</p>}
        </div>
        <div>
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.userPassword}
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
                    ${errors.password ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 text-xl">{errors.password}</p>}
        </div>
        <div>
            <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
                    ${errors.confirmPassword ? 'border-red-500' : ''}
                `}
                style={pixelFont}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 text-xl">{errors.confirmPassword}</p>}
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label 
                htmlFor="terms" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl"
            >
                I agree to the terms and conditions
            </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
        <Button
            type="submit"
            className={`
                w-full
                bg-gradient-to-r from-[#F44336] to-[#D32F2F]
                text-white text-lg font-bold
                transition-all duration-300
                hover:from-[#D32F2F] hover:to-[#B71C1C]
                hover:shadow-[6px_6px_0_0_#000000]
                active:translate-y-1
                ${pixelBorder}
                text-xl
            `}
            style={pixelFont}
        >
            Sign Up
        </Button>
    </form>
}
