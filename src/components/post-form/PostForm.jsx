import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index.js';
import appwriteService from '../../appwrite/config.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../custom.css'; // Import CSS file for styling loader

function PostForm({ post }) {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false); // State for loader

    const submit = async (data) => {
        setIsLoading(true); // Start loading
    
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
    
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
    
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
    
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                    console.log('successfully navigated to the path');
                } else {
                    console.log('Some error occurred');
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
    
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');

        return value;
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full relative">
                    {post ? 'Update' : 'Submit'}
                    {isLoading && (
                        <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                </Button>
            </div>
        </form>
    );
}
export default PostForm;