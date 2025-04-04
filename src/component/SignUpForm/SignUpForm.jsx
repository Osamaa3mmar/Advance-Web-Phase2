import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormGroup from "../FormGourp/FormGroup"

export default function SignUpForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [universityID, setUniversityID] = useState("");
    const [isStudent, setIsStudent] = useState(false);

    const colors = {
        charcoal: '#383434',
        neonGreen: '#22c55e',
        darkBg: '#1e1e1e', 
        cardDark: '#0f0f0f', 
        forBTN: '#50ac4c',
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newUser = {
            username,
            password,
            universityId: isStudent ? universityID : '',
            role: isStudent ? 'student' : 'admin',
            color: Math.floor(Math.random() * 1000000),
            id: JSON.parse(localStorage.getItem('users'))?.length + 1 || 1,
        };
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const userExists = users.find(user => user.username === newUser.username);
    
        if (userExists) {
            Toast.fire({
                icon: "error",
                title: "Username already exists!"
            });
        } else {
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
    
            // Reset form
            setUsername('');
            setPassword('');
            setUniversityID('');
            setIsStudent(false);
    
            Toast.fire({
                icon: "success",
                title: "Signed up successfully!"
            });
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.charcoal }}>
            <div className="rounded-2xl shadow-[0px_0px_10px_black] w-full max-w-md text-white border-4" 
                style={{
                    backgroundColor: colors.darkBg,
                    borderColor: colors.charcoal,
                    padding: "30px"
                }}>
                <form autoComplete="off" onSubmit={handleSubmit} className="space-y-2">
                    <h1 className="text-4xl font-semibold">Sign Up</h1>
                    
                    <FormGroup 
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username}  
                        name="username" 
                        id="username" 
                    />

                    <FormGroup 
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        name="password" 
                        id="password" 
                        type="password"
                    />

                    <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            id="student-box"
                            checked={isStudent}
                            onChange={() => setIsStudent(!isStudent)}
                            className="h-4 w-4 text-neonGreen focus:ring-neonGreen border-gray-600 rounded"
                        />
                        <label htmlFor="student-box">I am a student</label>
                    </div>

                    {isStudent && (
                        <FormGroup 
                            label="University ID"
                            onChange={(e) => setUniversityID(e.target.value)} 
                            value={universityID}  
                            name="University-id" 
                            id="University-id"
                        />
                    )}

                    <input 
                        type="submit" 
                        value="Sign Up" 
                        className="w-full text-lg font-medium cursor-pointer mt-2 outline-none 
                                   border border-gray-700 rounded-md px-4 py-2 border-2 border-transparent 
                                   transition duration-400 hover:border-gray-300"
                        style={{ backgroundColor: colors.forBTN }}
                    />

                    <p onClick={goToLoginPage} className="text-center text-sm text-gray-400">
                        Have an account? 
                        <span className="text-blue-500 cursor-pointer hover:underline"> login</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
