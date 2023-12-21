import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCategories } from 'src/contexts/CategoryContext'
import { LanguageContext } from '../contexts/LanguageContext'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function NewProductForm() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("1");
    const [language, setLanguage] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subcategoryId, setSubcategoryId] = useState("0");
    const [format, setFormat] = useState("paperback");
    const [publisher, setPublisher] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [isbn, setIsbn] = useState("");
    const [length, setLength] = useState("");
    const [dimensionLength, setDimensionLength] = useState("");
    const [dimensionWidth, setDimensionWidth] = useState("");
    const [image, setImage] = useState(null);

    const [message, setMessage] = useState('');
    const router = useRouter();

    const { categories, isLoadingCategories, isErrorCategories } = useCategories();
    const { user, isLoadingUser } = useUser();
    const { languages } = useContext(LanguageContext);

    useEffect(() => {
        if (!isLoadingCategories && !isErrorCategories && categories.length > 0) {
            setCategoryId(categories[0].id.toString());
        }
    }, [isLoadingCategories, categories, isErrorCategories]);

    if (isLoadingCategories) return <div>Loading categories...</div>;
    if (isLoadingUser) return <div>Loading user...</div>;
    if (isErrorCategories) return <div>Error loading categories</div>;
    
    console.log(categories);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        
        formData.append("name", name);
        formData.append("author", author);
        formData.append("price", price);
        formData.append("condition", condition);
        formData.append("language", language);
        formData.append("description", description);
        formData.append("categoryId", categoryId);
        formData.append("subcategoryId", subcategoryId);
        formData.append("format", format);
        formData.append("publisher", publisher);
        formData.append("publicationYear", publicationYear);
        formData.append("isbn", isbn);
        formData.append("length", length);
        formData.append("dimensionLength", dimensionLength);
        formData.append("dimensionWidth", dimensionWidth);
        formData.append("image", image);
        formData.append("sellerId", user.sub);

        try {
            const response = await axios.post('/api/products', formData);
            console.log(response);
            setMessage('Book added successfully!');
            router.push('/'); // Navigate back to the home page
          } catch (error) {
            console.error(error);
            setMessage('Error: Something went wrong.');
          }
    }
  return (
    <div className="container mx-auto p-6">
        <h1 className="font bold text-2xl flex justify-center">SELL YOUR BOOK</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6 mb-6">
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label htmlFor="category" className="block text-red-600 font-semibold mb-2">
                        Category*
                    </label>
                    <select id="category" 
                            name="category" 
                            value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="subcategory" className="block text-gray-700 font-semibold mb-2">Sub Category</label>
                    <select id="subcategory" 
                            value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)}
                            name="subcategory" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="0"></option>
                            {categories.find(
                                category => category.id === Number(categoryId))?.subcategories.map
                                (subcategory => (
                                <option 
                                    key={subcategory.id} 
                                    value={subcategory.id}>{subcategory.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-red-600 font-semibold mb-2">Title*</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                    type="text" 
                    id="name" 
                    name="name" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required />
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="author" className="block text-red-600 font-semibold mb-2">Author*</label>
                    <input  value={author} onChange={(e) => setAuthor(e.target.value)}  
                            type="text" 
                            id="author" 
                            name="author" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required />
                </div>
                <div className="w-full md:w-1/2 px-2">
                <label htmlFor="price" className="block text-red-600 font-semibold mb-2">Price*</label>
                    <input  value={price} onChange={(e) => setPrice(e.target.value)}  
                            type="currency"
                            id="price" 
                            name="price" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required />
                </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label htmlFor="language" className="block text-red-600 semibold-bold mb-2">
                        Language*
                    </label>
                    <select id="language" 
                            value={language} 
                            onChange={(e) => setLanguage(e.target.value)}
                            name="language" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label htmlFor="condition" className="block text-red-600 font-semibold mb-2">Condition*</label>
                    <select id="condition" 
                            value={condition} onChange={(e) => setCondition(e.target.value)}
                            name="condition" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="1">New</option>
                            <option value="2">Like New</option>
                            <option value="3">Very Good</option>
                            <option value="4">Good</option>
                            <option value="5">Acceptable</option>
                    </select>
                </div>
            </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea id="description" 
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            name="description" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </textarea>
                </div>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label htmlFor="publisher" className="block text-gray-700 font-semibold mb-2">Publisher</label>
                    <input  value={publisher} onChange={(e) => setPublisher(e.target.value)}
                            type="text" 
                            id="publisher" 
                            name="publisher" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label htmlFor="publicationYear" className="block text-gray-700 font-semibold mb-2">Publication Year</label>
                    <input  value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)}
                            type="text" 
                            id="publicationYear" 
                            name="publicationYear" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>
            </div>
                <div className="mb-4">
                    <label htmlFor="format" className="block text-gray-700 font-semibold mb-2">Format</label>
                    <label htmlFor="paperback" className="inline-flex items-center mr-4">
                        <input  type="radio"
                                id="paperback" 
                                name="format" 
                                value="paperback" 
                                className="form-radio h-4 w-4 text-indigo-600" 
                                checked={format === "paperback"}
                                onChange={() => setFormat("paperback")} /> 
                        <span className="ml-2 text-gray-700">Paperback</span>
                    </label>
                    <label htmlFor="hardcover" className="inline-flex items-center mr-4">
                        <input type="radio" 
                            id="hardcover" 
                            name="format" 
                            value="hardcover" 
                            className="form-radio h-4 w-4 text-indigo-600"
                            checked={format === "hardcover"}
                            onChange={() => setFormat("hardcover")} />
                        <span className="ml-2 text-gray-700">Hardcover</span>
                    </label>
                </div>
            
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full sm:w-1/3 px-2 ">
                        <label className="block mb-2 font-semibold" htmlFor="length">
                            Length
                        </label>
                        <input
                            value={length} onChange={(e) => setLength(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="text"
                            id="length"
                            name="length"
                            placeholder="Number of pages"
                        />
                    </div>
                <div className="w-full sm:w-2/3 px-2">
                    <label className="block mb-2 font-semibold" htmlFor="dimensionLength">
                    Dimensions (cm)
                    </label>
                    <div className="flex items-center">
                    <input
                        value={dimensionLength} onChange={(e) => setDimensionLength(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-l-md"
                        type="text"
                        id="dimensionLength"
                        name="dimensionLength"
                        placeholder="Length"
                    />
                    <p className="px-2 text-gray-500">x</p>
                    <input
                        value={dimensionWidth} onChange={(e) => setDimensionWidth(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-r-md"
                        type="text"
                        id="dimensionWidth"
                        name="dimensionWidth"
                        placeholder="Width"
                    />
                    <p className="px-2 text-gray-500">cm</p>
                    </div>
                </div>
                </div>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="isbn" className="block text-gray-700 font-semibold mb-2">
                    ISBN
                    </label>
                    <input
                        value={isbn} onChange={(e) => setIsbn(e.target.value)}
                        type="text"
                        name="isbn"
                        id="isbn"
                        placeholder="Enter book ISBN"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>
                
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="image" className="block px-4 text-gray-700 font-semibold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        className="px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>
            </div>
                <div className="flex items-center justify-between">
                    <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Submit
                    </button>
                </div>
                {message && <p className="text-red-600">{message}</p>}
        </form>
    </div>
  );
});