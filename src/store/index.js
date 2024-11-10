// src/store/index.js
import { configureStore, createSlice } from '@reduxjs/toolkit'; 

const dummyJobs = [
    { 
        id: 1, 
        title: 'Software Engineer', 
        description: 'Develop and maintain web applications.',
        candidates: 3, 
        applicants: [
            { 
                id: 1, 
                name: 'John Doe', 
                email: 'john.doe@example.com',
                contact: '+1234567890',
                skills: ['JavaScript', 'React', 'Node.js'],
                experience: '3 years',
                resume: 'link_to_resume_1.pdf', 
                applicationDate: '2024-10-01', 
                status: 'Under Review' 
            },
            { 
                id: 2, 
                name: 'Jane Smith', 
                email: 'jane.smith@example.com',
                contact: '+1987654321',
                skills: ['Python', 'Django', 'SQL'],
                experience: '2 years',
                resume: 'link_to_resume_2.pdf', 
                applicationDate: '2024-10-03', 
                status: 'Interview Scheduled' 
            },
            { 
                id: 3, 
                name: 'Mark Johnson', 
                email: 'mark.johnson@example.com',
                contact: '+1122334455',
                skills: ['Java', 'Spring', 'AWS'],
                experience: '4 years',
                resume: 'link_to_resume_3.pdf', 
                applicationDate: '2024-10-04', 
                status: 'Under Review' 
            }
        ]
    },
    { 
        id: 2, 
        title: 'Data Analyst', 
        description: 'Analyze data to support decision making.',
        candidates: 2, 
        applicants: [
            { 
                id: 1, 
                name: 'Alice Brown', 
                email: 'alice.brown@example.com',
                contact: '+2233445566',
                skills: ['Excel', 'SQL', 'Data Visualization'],
                experience: '1 year',
                resume: 'link_to_resume_4.pdf', 
                applicationDate: '2024-09-28', 
                status: 'Under Review' 
            },
            { 
                id: 2, 
                name: 'Bob White', 
                email: 'bob.white@example.com',
                contact: '+3344556677',
                skills: ['Python', 'Pandas', 'Machine Learning'],
                experience: '3 years',
                resume: 'link_to_resume_5.pdf', 
                applicationDate: '2024-09-29', 
                status: 'Interview Scheduled' 
            }
        ]
    },
    { 
        id: 3, 
        title: 'Product Manager', 
        description: 'Lead product strategy and execution.',
        candidates: 4, 
        applicants: [
            { 
                id: 1, 
                name: 'Lucy Green', 
                email: 'lucy.green@example.com',
                contact: '+4433221100',
                skills: ['Agile', 'Roadmap Planning', 'Team Management'],
                experience: '5 years',
                resume: 'link_to_resume_6.pdf', 
                applicationDate: '2024-10-05', 
                status: 'Under Review' 
            },
            { 
                id: 2, 
                name: 'David Lee', 
                email: 'david.lee@example.com',
                contact: '+5566778899',
                skills: ['Product Design', 'Market Research', 'UX/UI'],
                experience: '4 years',
                resume: 'link_to_resume_7.pdf', 
                applicationDate: '2024-10-06', 
                status: 'Interview Scheduled' 
            },
            { 
                id: 3, 
                name: 'Eva Black', 
                email: 'eva.black@example.com',
                contact: '+6677889900',
                skills: ['Stakeholder Management', 'Product Strategy', 'Data Analysis'],
                experience: '6 years',
                resume: 'link_to_resume_8.pdf', 
                applicationDate: '2024-10-07', 
                status: 'Under Review' 
            },
            { 
                id: 4, 
                name: 'James White', 
                email: 'james.white@example.com',
                contact: '+7788990011',
                skills: ['Market Analysis', 'Business Strategy', 'Leadership'],
                experience: '2 years',
                resume: 'link_to_resume_9.pdf', 
                applicationDate: '2024-10-08', 
                status: 'Interview Scheduled' 
            }
        ]
    },
    { 
        id: 4, 
        title: 'UX/UI Designer', 
        description: 'Design and enhance user interfaces.',
        candidates: 3, 
        applicants: [
            { 
                id: 1, 
                name: 'Sophia Taylor', 
                email: 'sophia.taylor@example.com',
                contact: '+8899001122',
                skills: ['Sketch', 'Figma', 'UI Design'],
                experience: '3 years',
                resume: 'link_to_resume_10.pdf', 
                applicationDate: '2024-10-09', 
                status: 'Under Review' 
            },
            { 
                id: 2, 
                name: 'Liam Wilson', 
                email: 'liam.wilson@example.com',
                contact: '+9900112233',
                skills: ['Photoshop', 'Wireframing', 'UX Research'],
                experience: '2 years',
                resume: 'link_to_resume_11.pdf', 
                applicationDate: '2024-10-10', 
                status: 'Under Review' 
            },
            { 
                id: 3, 
                name: 'Olivia King', 
                email: 'olivia.king@example.com',
                contact: '+1011122334',
                skills: ['Illustrator', 'Prototyping', 'User Testing'],
                experience: '4 years',
                resume: 'link_to_resume_12.pdf', 
                applicationDate: '2024-10-11', 
                status: 'Interview Scheduled' 
            }
        ]
    },
    { 
        id: 5, 
        title: 'Marketing Specialist', 
        description: 'Develop and execute marketing campaigns.',
        candidates: 2, 
        applicants: [
            { 
                id: 1, 
                name: 'Jackson Martinez', 
                email: 'jackson.martinez@example.com',
                contact: '+1122334455',
                skills: ['SEO', 'Google Ads', 'Content Marketing'],
                experience: '3 years',
                resume: 'link_to_resume_13.pdf', 
                applicationDate: '2024-10-12', 
                status: 'Under Review' 
            },
            { 
                id: 2, 
                name: 'Amelia Scott', 
                email: 'amelia.scott@example.com',
                contact: '+2233445566',
                skills: ['Social Media Marketing', 'Brand Strategy', 'Influencer Marketing'],
                experience: '2 years',
                resume: 'link_to_resume_14.pdf', 
                applicationDate: '2024-10-13', 
                status: 'Interview Scheduled' 
            }
        ]
    }
];

localStorage.setItem('jobs', JSON.stringify(dummyJobs));

// Load jobs from local storage or use dummy data if not available
const loadJobs = () => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs'));
    console.log("stored jobs are:", storedJobs);
    if (!storedJobs) {
        localStorage.setItem('jobs', JSON.stringify(dummyJobs));
        return dummyJobs;
    }
    return storedJobs;
};

// Redux slice for jobs and candidates
const jobSlice = createSlice({
    name: 'jobs',
    initialState: loadJobs(),
    reducers: {
        addJob: (state, action) => {
            state.push(action.payload);
        },
        editJob: (state, action) => {
            const index = state.findIndex(job => job.id === action.payload.id);
            if (index !== -1) state[index] = { ...state[index], ...action.payload };
        },
        deleteJob: (state, action) => {
            return state.filter(job => job.id !== action.payload);
        },
        updateJobCandidates: (state, action) => {
            const job = state.find(job => job.id === action.payload.jobId);
            if (job) {
                job.applicants.push(action.payload.candidate);
            }
        },
        updateCandidateStatus: (state, action) => {
            const job = state.find(job => job.id === action.payload.jobId);
            if (job) {
                const candidate = job.applicants.find(cand => cand.id === action.payload.candidateId);
                if (candidate) {
                    candidate.status = action.payload.status;
                }
            }
        },
    },
});
 

export const { addJob, editJob, deleteJob, updateJobCandidates, updateCandidateStatus } = jobSlice.actions;

const store = configureStore({
    reducer: { jobs: jobSlice.reducer },
});

store.subscribe(() => {
    localStorage.setItem('jobs', JSON.stringify(store.getState().jobs));
});

export default store;
