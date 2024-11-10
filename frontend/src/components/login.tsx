import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth.currentUser){
      navigate("/")
    }
  },[])
  const handleGoogleAuth = async() => {
    try {
      let googleProvider = new GoogleAuthProvider()
      await signInWithPopup(auth , googleProvider)
    } catch (error) {
      setError(JSON.stringify(error))
    }
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      navigate('/');
    } catch (error:any) {
        setLoading(false)
        console.log(error.message)
        error.message == "Firebase: Error (auth/invalid-credential)." ? setError("Invalid Credentials") : setError(error.message)
    }
  };
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  required
                  className="relative block w-full rounded-md border-0 bg-gray-800 p-2 text-white placeholder-gray-400"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 bg-gray-800 p-2 text-white placeholder-gray-400"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                {loading? "Loading":"Sign in"}
              </button>
            </div>
          </form>
          <div className="text-center flex flex-col gap-y-2">
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
              Don't have an account? Register
            </Link>
            <button onClick={handleGoogleAuth} className="px-4 py-1 bg-blue-600 rounded-md font-semibold text-white">Sign in with Google</button>
          </div>
        </div>
      </div>
    )
}