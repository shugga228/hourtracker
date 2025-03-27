import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://psotsoljdspoqjttyrxr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb3Rzb2xqZHNwb3FqdHR5cnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNjk5NDQsImV4cCI6MjA0OTY0NTk0NH0.o1H5SXD0a-4RiBMcTyelbBmVuj6PqdIB5NWW1wSMImg");

const useEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const useEvents = async () => {
            const { data } = await supabase.from("eventTable").select("name, date, time, location");
            setEvents(data)
        };
        useEvents();

    }, []);

    return{events}; 
};

export default useEvents;

//pulls db data from eventstable and puts into events list -> need to incorporate into app.js