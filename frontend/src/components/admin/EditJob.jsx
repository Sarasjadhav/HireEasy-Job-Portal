import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
                if (res.data.success) {
                    const job = res.data.job;
                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirements: Array.isArray(job.requirements) ? job.requirements.join(", ") : job.requirements || "",
                        salary: job.salary?.toString() || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        experience: job.experienceLevel?.toString() || "",
                        position: job.position || 0,
                        companyId: job.company?._id || ""
                    });
                }
            } catch (error) {
                toast.error("Failed to load job details.");
            } finally {
                setFetching(false);
            }
        };
        fetchJob();
    }, [id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectCompanyHandler = (value) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
        if (selectedCompany) setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message || "Job updated successfully.");
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update job.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="animate-spin h-8 w-8 text-[#6A38C2]" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md'>
                    <div className='flex items-center gap-4 mb-6'>
                        <Button type="button" onClick={() => navigate("/admin/jobs")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft size={16} />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Edit Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements (comma-separated)</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience Level (years)</Label>
                            <Select value={input.experience.toString()} onValueChange={(value) => setInput({ ...input, experience: value })}>
                                <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
                                    <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">Entry Level (0 years)</SelectItem>
                                        <SelectItem value="1">1-2 years</SelectItem>
                                        <SelectItem value="3">Mid-Level (3+ years)</SelectItem>
                                        <SelectItem value="5">Senior (5+ years)</SelectItem>
                                        <SelectItem value="10">Lead (10+ years)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select onValueChange={selectCompanyHandler}>
                                    <SelectTrigger className="w-full my-1">
                                        <SelectValue placeholder={companies.find(c => c._id === input.companyId)?.name || "Select a Company"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    {loading
                        ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button>
                        : <Button type="submit" className="w-full my-4">Update Job</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default EditJob
