import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { db } from '../../firebase'; // Adjust the path as needed
import { doc, getDoc, setDoc } from 'firebase/firestore';

import Header from './components/Header';
import Instructions from './components/Instructions';
import Copyright from '../../components/Copyright';

import Intraining from "../../assets/in-TRAINING.png";
import Gettingthere from "../../assets/getting-THERE.png";
import Gotthere from "../../assets/ready.png";

const defaultTheme = createTheme();

const Roadmap = () => {
  const title = 'IT Roadmap';

  const instructions = `
    <p style="margin-bottom: 0.5rem;">1. Select a course from the drop-down menu below</p>
    <p style="margin-bottom: 0.5rem;">2. Look at the provided entry-level job role and description associated with the selected course</p>
    <p style="margin-bottom: 0.5rem;">3. Indicate whether you are developing or have already established the tech and soft skills needed to do the job role</p>
    <p style="margin-bottom: 0.5rem;">4. Review the types of certifications that can help you land the job role and indicate whether you are planning or acquire or have already been certified</p>
    <p style="margin-bottom: 0.5rem;">5. Answer the common tech interview questions for the job role and indicate whether you have answered them or had your answers reviewed by a peer/instructor</p>
    <p style="margin-bottom: 0.5rem;">6. Review your progress</p>
    <p style="margin-bottom: 0.5rem;">7. Take a look at the <a href="https://drive.google.com/file/d/1xIzA-TBuCdEZxnmcdw5u441Rc1bpqHmS/view" target="_blank" rel="noopener noreferrer" style="color: blue;">IT Certification Roadmap</a> to help you plan your journey</p>
  `;

  const roadmapContents = [
    {
      course: "Course 1 - Hardware and Troubleshooting",
      jobRole: "Service Technician",
      jobDescriptionLink: "https://drive.google.com/file/d/1egoYT58CkUNWN0uikkg3A_J6HwS2vxop/view?usp=drive_link",
      techLabels: [
        "Internal Computer Hardware",
        "Inventory Logging",
        "Operating Systems",
        "Routine Hardware Maintenance",
        "Software Management",
        "System Logs",
        "Troubleshooting Software and Hardware",
      ],
      pdLabels: [
        "Adaptability",
        "Analytical",
        "Communication",
        "Critical Thinking",
        "Leadership",
        "Organization",
        "Time Management",
      ],
      certLabels: [
        "CompTIA A+", 
        "Google IT Support"
      ],
      questionsLabels: [
        "What are the internal components found in a modern computer?",
        "What is the difference between RAM vs ROM and where is it used?",
        "What is a blue screen of death and what are common problems associated with it?",
        "A customer is having problems with their computer shutting down at different intervals. What questions would you ask them to break down the problem?",
        "Describe the steps you would take to troubleshoot a computer that won't boot into the operating system.",
      ],
    },
    {
      course: "Course 2 - Networking",
      jobRole: "IT End User Support Technician",
      jobDescriptionLink: "https://drive.google.com/file/d/11mtur-L-BSI9eEDFlJq3EoT7Wv4RyNnp/view?usp=sharing",
      techLabels: [
        "DNS and DHCP",
        "IP addressing and subnetting",
        "Network backup and recovery",
        "Network cabling",
        "Network devices",
        "Network security",
        "Network troubleshooting tools",
        "OSI and TCP/IP model",
      ],
      pdLabels: [
        "Organization",
        "Teamwork/Collaboration",
        "Problem Solving",
        "Communication",
        "Detail-Oriented",
      ],
      certLabels: [
        "CCNA",
        "CompTIA A+",
        "CompTIA Network+",
        "Google IT Support ",
      ],
      questionsLabels: [
        "What is an IP address? Differentiate between IPv4 and IPv6.",
        "Describe the difference between a router, switch, and hub.",
        "What is TCP/IP, and what are its primary functions?",
        "What steps would you take to diagnose a slow network connection?",
        "Explain your familiarity with command-line networking tools (e.g., ping, traceroute).",
      ],
    },
    {
      course: "Course 3 - Virtualization And CLI",
      jobRole: "I.T. Administrator",
      jobDescriptionLink: "https://drive.google.com/file/d/1pL-58GytsdNMdKAymUXisHalmm46haQo/view?usp=sharing",
      techLabels: [
        "Documentation",
        "Documentation Of Processes",
        "Operating Systems",
        "Server Administration",
        "Troubleshooting Customer inquiries",
        "Troubleshooting Hardware/Software/Network Based issues",
        "Virtualization And CLI",
      ],
      pdLabels: [
        "Teamwork/Collaboration",
        "Problem Solving",
        "Time Management",
        "Adaptability",
        "Detail-Oriented",
      ],
      certLabels: [
        "CCNA",
        "CompTIA A+",
        "CompTIA Network+",
        "CompTIA Security+",
        "Google IT Support ",
      ],
      questionsLabels: [
        "If you are wanting to check the health of a server, what are some tools or steps you may use to check on this?",
        "What is your experience with server virtualization?",
        "What is your experience with data recovery? Can you tell us a time you have had to backup important data?",
        "Tell me about a time you had to support a customer or employee with a difficult technical issue and how were you able to solve it",
        "What is the importance of having redundancy in a network. Can you give some examples?",
      ],
    },
    {
      course: "Course 4 - Networking",
      jobRole: "I.T. Service Desk Technician",
      jobDescriptionLink: "https://drive.google.com/file/d/1TZMYEjJjLLJGPyhwRrXplbGbBTcuKxzh/view?usp=sharing",
      techLabels: [
        "System Monitoring",
        "Hardware Lifecycle",
        "Technical Support",
        "Backups/Disaster Recovery Plans/Post Mortems",
        "User Access And Control",
        "Network Topology",
        "Proper Use Of Network Rulesets",
        "Network Security",
      ],
      pdLabels: [
        "Communication",
        "Adaptability",
        "Time Management",
        "Organization",
        "Stress Management",
        "Critical Thinking and Problem Solving",
      ],
      certLabels: [
        "CompTIA A+",
        "CompTIA Security+",
        "CompTIA Network+",
        "Microsoft Certified: Azure Fundamentals",
        "Microsoft Certified: Azure Administrator Associate",
        "ITIL Foundation",
      ],
      questionsLabels: [
        "Can you explain different RAID options and what you would use for a general server configuration?",
        "How is subnetting important in network administration?",
        "If your network is having load balancing issues, what are some technologies you could deploy to mitigate this?",
        "What are the different DHCP allocation methods and what is the most secure?",
        "What is your experience with virtualization and servers?",
      ],
    },
    {
      course: "Course 5 - Cybersecurity",
      jobRole: "Associate Security Analyst",
      jobDescriptionLink: "https://drive.google.com/file/d/1AG_u8uwSZQvrEC4dqKGK9VeWJSvrtr8w/view?usp=sharing",
      techLabels: [
        "CIA Triad",
        "Encryption and cryptography",
        "Authentication vs Authorization",
        "Incident Response",
        "Types of Social Engineering",
        "Types of Malware",
        "Intrusion Detection Systems vs Intrusion Prevention Systems",
        "Web Security",
      ],
      pdLabels: [
        "Problem Solving",
        "Communication",
        "Ethical Mindset",
        "Adaptability",
        "Attention to Detail",
        "Teamwork and Collaboration",
      ],
      certLabels: [
        "CompTIA Network+",
        "CompTIA Security+",
        "Certified Ethical Hacker",
        "Cisco Certified CyperOps Associate",
      ],
      questionsLabels: [
        "What are the internal components found in a modern computer?",
        "What is the difference between RAM vs ROM and where is it used?",
        "What is a blue screen of death and what are common problems associated with it?",
        "A customer is having problems with their computer shutting down at different intervals. What questions would you ask them to break down the problem?",
        "Describe the steps you would take to troubleshoot a computer that won't boot into the operating system.",
      ],
    }
  ];
  
  const { user } = useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (user) {
      const loadResponses = async () => {
        const docRef = doc(db, 'roadmap', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResponses(docSnap.data());
        }
      };
      loadResponses();
    }
  }, [user]);

  const handleResponseChange = async (label) => {
    const updatedResponses = { ...responses, [label]: !responses[label] };
    setResponses(updatedResponses);
    if (user) {
      const docRef = doc(db, 'roadmap', user.uid);
      await setDoc(docRef, updatedResponses, { merge: true });
    }
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const selectedRoadmap = roadmapContents.find(roadmap => roadmap.course === selectedCourse);

  const countEstablishedSkills = () => {
    return Object.keys(responses).filter(key => key.endsWith('-established') && responses[key]).length;
  };

  const establishedSkillsCount = countEstablishedSkills();
  let progressImage;

  if (establishedSkillsCount < 5) {
    progressImage = Intraining;
  } else if (establishedSkillsCount < 15) {
    progressImage = Gettingthere;
  } else {
    progressImage = Gotthere;
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header title={title} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 4 }}>
              <Instructions instructions={instructions} />
              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    displayEmpty
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                  >
                    <MenuItem value="" disabled>Select a Course</MenuItem>
                    {roadmapContents.map((roadmap) => (
                      <MenuItem key={roadmap.course} value={roadmap.course}>
                        {roadmap.course}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>
              </Grid>
              {selectedRoadmap && (
                <>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold", width: '50%' }}>Entry-Level Job Role:</TableCell>
                              <TableCell sx={{ width: '25%', textAlign: 'center' }}>{selectedRoadmap.jobRole}</TableCell>
                              <TableCell sx={{ color: "blue", width: '25%', textAlign: 'center' }}>
                                <a href={selectedRoadmap.jobDescriptionLink} target="_blank" rel="noopener noreferrer">
                                  Link to Job Description
                                </a>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold", width: '50%' }}>Tech Skills Involved - For this job, I should have competency/experience with:</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Developing Skills</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Established Skills</TableCell>
                            </TableRow>
                            {selectedRoadmap.techLabels.map((label, index) => (
                              <TableRow key={index}>
                                <TableCell>{label}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`tech-${label}-developing`] || false}
                                    onChange={() => handleResponseChange(`tech-${label}-developing`)}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`tech-${label}-established`] || false}
                                    onChange={() => handleResponseChange(`tech-${label}-established`)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold", width: '50%' }}>Soft Skills Preferred - For this job, I should feel comfortable with:</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Developing Skills</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Established Skills</TableCell>
                            </TableRow>
                            {selectedRoadmap.pdLabels.map((label, index) => (
                              <TableRow key={index}>
                                <TableCell>{label}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`pd-${label}-developing`] || false}
                                    onChange={() => handleResponseChange(`pd-${label}-developing`)}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`pd-${label}-established`] || false}
                                    onChange={() => handleResponseChange(`pd-${label}-established`)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold", width: '50%' }}>Certifications - For this job, I may need to be certified with:</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Planning to Acquire</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Obtained Certification</TableCell>
                            </TableRow>
                            {selectedRoadmap.certLabels.map((label, index) => (
                              <TableRow key={index}>
                                <TableCell>{label}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`cert-${label}-developing`] || false}
                                    onChange={() => handleResponseChange(`cert-${label}-developing`)}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`cert-${label}-established`] || false}
                                    onChange={() => handleResponseChange(`cert-${label}-established`)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: "bold", width: '50%' }}>Common Interview Questions - Questions I should prepare for:</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Answered by Yourself</TableCell>
                              <TableCell sx={{ fontWeight: "bold", width: '25%', textAlign: 'center' }}>Received Feedback</TableCell>
                            </TableRow>
                            {selectedRoadmap.questionsLabels.map((label, index) => (
                              <TableRow key={index}>
                                <TableCell>{label}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`questions-${label}-developing`] || false}
                                    onChange={() => handleResponseChange(`questions-${label}-developing`)}
                                  />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                  <Checkbox
                                    checked={responses[`questions-${label}-established`] || false}
                                    onChange={() => handleResponseChange(`questions-${label}-established`)}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={progressImage} alt="Progress" style={{ width: '50%', height: 'auto' }} />
                    </Paper>
                  </Grid>       
                </>
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Roadmap;
