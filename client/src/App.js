import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentLogin from "./pages/login/student/StudentLogin";
import StaffLogin from "./pages/login/staff/StaffLogin";
import StudentDash from "./pages/dashboard/student/StudentDash";
import StudentSignup from "./pages/signup/student/StudentSignup";
import StaffSignup from "./pages/signup/staff/StaffSignup";
import SignupSuccess from "./pages/signup/SignupSuccess";
import Logbook from "./pages/logbook/Logbook";
import AddLog from "./pages/logbook/AddLog";
import ViewLog from "./pages/logbook/ViewLog";
import StuProfile from "./pages/profile/student/StuProfile";
import CoodProfile from "./pages/profile/staff/CoodProfile";
import SupervisorProfile from "./pages/profile/staff/SupervisorProfile";
import StudAnnouncements from "./pages/announcements/student/StudAnnouncements";
import StuApplicationForm from "./pages/application/student/StuApplicationForm";
import Internships from "./pages/internships/student/Internships";
import CoodOverview from "./pages/dashboard/coodinator/CoodOverview";
import ViewStuApplication from "./pages/application/staff/ViewStuApplication";
import ViewOngoingInternship from "./pages/internships/coordinator/ViewOngoingInternship";
import ViewStdLogbook from "./pages/logbook/coordinator/ViewStdLogbook";
import ViewSingleLog from "./pages/logbook/coordinator/ViewSingleLog";
import ViewStdSupeEvaluation from "./pages/evaluation/coordinator/ViewSupeEvaluation";
import ViewStdCoodEvaluation from "./pages/evaluation/supervisor/ViewStdCoodEvaluation";
import CoodStdEvaluation from "./pages/evaluation/coordinator/CoodStdEvaluation";
import SupeStdEvaluation from "./pages/evaluation/supervisor/SupeStdEvaluation";
import CoordinatorDash from "./pages/dashboard/COORDINATOR/CoordinatorDash";
import SupervisorAccount from "./pages/dashboard/SUPERVISORACCOUNT/SupervisorAccount";
import Settings from "./pages/settings/settings";
import ViewAllInternships from "./pages/internships/coordinator/ViewAllInternships";
import ViewAllStudents from "./pages/students/ViewAllStudents";
import ViewSupervisors from "./pages/supervisors/ViewSupervisors";
import ViewStudentProfile from "./pages/students/ViewStudentProfile";
import CoodAnnouncements from "./pages/announcements/coordinator/CoodAnnouncements";
import ViewAssessment from "./pages/evaluation/student/ViewAssessment";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/student/login" element={<StudentLogin />} />
					<Route path="/student/signup" element={<StudentSignup />} />
					<Route path="/staff/login" element={<StaffLogin />} />
					<Route path="/student/profile" element={<StuProfile />} />
					<Route
						path="/signup/successful"
						element={
							<SignupSuccess
								text={"Account Created Successfully"}
								message={
									"Check your email to verify your account."
								}
							/>
						}
					/>
					<Route
						path="/student/dashboard"
						element={<StudentDash />}
					/>
					<Route
						path="/student/announcements"
						element={<StudAnnouncements />}
					/>
					<Route
						path="/student/internships/"
						element={<Internships />}
					/>
					<Route
						path="/student/internship/application-form"
						element={<StuApplicationForm />}
					/>
					<Route path="/student/logbook" element={<Logbook />} />
					<Route path="/student/add/new/log" element={<AddLog />} />
					<Route path="/student/add/new/log" element={<AddLog />} />
					<Route path="/student/view-log" element={<ViewLog />} />
					<Route path="/student/view-assessment" element={<ViewAssessment />} />

					{/* COORDINATOR ROUTES */}
					<Route
						path="/coordinator/signup"
						element={<StaffSignup />}
					/>
					<Route
						path="/coordinator/view-student-supervisor/evaluation"
						element={<ViewStdSupeEvaluation />}
					/>
					<Route
						path="/coordinator/announcements"
						element={<CoodAnnouncements />}
					/>
					<Route
						path="/coordinator/view-all-students"
						element={<ViewAllStudents />}
					/>
					<Route
						path="/coordinator/view-student-profile"
						element={<ViewStudentProfile />}
					/>

					<Route
						path="/coordinator/view-all-supervisors"
						element={<ViewSupervisors />}
					/>
					<Route
						path="/coordinator/view-student-logbook"
						element={<ViewStdLogbook />}
					/>
					<Route
						path="/coordinator/student/assessment"
						element={<CoodStdEvaluation />}
					/>
					<Route
						path="/coordinator/view/student-name/log/day"
						element={<ViewSingleLog />}
					/>
					<Route
						path="/coordinator/view-all-internships"
						element={<ViewAllInternships />}
					/>
					<Route
						path="/coordinator/view-internship"
						element={<ViewOngoingInternship />}
					/>
					<Route
						path="/coordinator/overview"
						element={<CoodOverview />}
					/>
					<Route
						path="/coordinator/profile"
						element={<CoodProfile />}
					/>
					<Route
						path="/coordinator/view/internship/application"
						element={<ViewStuApplication />}
					/>
					<Route
						path="/coordinator/dashboard"
						element={<CoordinatorDash />}
					/>
					<Route
						path="/coordinator/createsupervisor"
						element={<SupervisorAccount />}
					/>
					<Route
						path="/user/settings"
						element={<Settings />}
					/>

					{/* SUPERVISOR ROUTES */}
					<Route
						path="/supervisor/view-student-coordinator/evaluation"
						element={<ViewStdCoodEvaluation />}
					/>
					<Route
						path="/supervisor/student/assessment"
						element={<SupeStdEvaluation />}
					/>
					<Route
						path="/supervisor/profile"
						element={<SupervisorProfile />}
					/>
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
