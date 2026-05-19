import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { getUserProfile } from "../api/korpApiService";

const AuditorPortal = () => {
    const [year, setYear] = useState("2024-2025");
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserProfile();
            console.log("Auditor Profile API Response:", response.data);
            const data = response?.data?.data || response?.data?.Data || response?.data || null;
            setProfileData(data);
        } catch (err) {
            console.error("Profile API Error:", err);
            setError("Failed to fetch profile details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="px-6 py-6 max-w-[1600px] mx-auto space-y-6">
            <h1 className="text-[18px] font-bold text-gray-800">Auditor Portal</h1>

            {/* Profile Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-[14px] font-bold text-gray-700 mb-4 uppercase tracking-wider">Auditor Details</h2>
                {loading ? (
                    <div className="text-gray-500 text-sm">Loading profile...</div>
                ) : error ? (
                    <div className="text-red-500 text-sm">{error}</div>
                ) : profileData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <span className="text-[11px] text-gray-400 font-bold uppercase block">Name</span>
                            <span className="text-[13px] text-gray-800 font-semibold">{profileData.name || profileData.Name || profileData.manager_name || "-"}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[11px] text-gray-400 font-bold uppercase block">Email</span>
                            <span className="text-[13px] text-gray-800 font-semibold">{profileData.email || profileData.Email || "-"}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[11px] text-gray-400 font-bold uppercase block">Auditor Code / ID</span>
                            <span className="text-[13px] text-gray-800 font-semibold">{profileData.manager_id || profileData.code || profileData.Code || "-"}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400 text-sm">No profile data loaded.</div>
                )}
            </div>

            {/* Financial Year Selector */}
            <div className="bg-gray-100 border border-gray-200 p-8 rounded-xl">
                <div className="flex items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] text-gray-400 font-bold uppercase ml-1">Financial year</label>
                        <select
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            className="h-[44px] w-[220px] border border-gray-200 rounded-lg px-4 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all cursor-pointer appearance-none shadow-sm"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                        >
                            <option value="2024-2025">2024-2025</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2022-2023">2022-2023</option>
                        </select>
                    </div>
                    <button
                        onClick={fetchProfile}
                        disabled={loading}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-[13px] transition-all uppercase tracking-wider shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AuditorPortal;
