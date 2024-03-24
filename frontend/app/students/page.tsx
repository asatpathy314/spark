import { title } from "@/components/primitives";;

export default function StudentPage() {
	return (
		<div>
		<h1 className={title()}>For Students</h1>
		<section>
			<p> <br /> What is your passion?
			</p> 
			<p> <br /> Who you do you want to be?
			</p> 
			<p> <br /> What do you want to achieve?
			</p> 
		</section>
		<section>
			<p> <br />
				Navigating through life isn't a walk in a park, but it shouldn't have to be an uphill battle. 
				Going to college or succeeding academically can be difficult, but we can help. Spark is a platform 
				we developed to connect students to mentors in college that are passionate about nurturing the next 
				generations of scientists, engineers, etc. Let us help you find the support you need to succeed. 
			</p> 
		</section>
		</div>
	);
}
