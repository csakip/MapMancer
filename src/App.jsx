import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "@supabase/supabase-js";
import PhaserComponent from "./PhaserComponent";
import { useEffect } from "preact/hooks";
import UiComponent from "./UI/UiComponent";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

function App() {
  useEffect(() => {
    // connectToSupabase();
  }, []);

  async function connectToSupabase() {
    const { data, error } = await supabase.auth.admin.listUsers();
    console.log(data, error);
  }

  return (
    <div className='main-container prevent-select'>
      <PhaserComponent>
        <UiComponent />
      </PhaserComponent>
    </div>
  );
}

export default App;
