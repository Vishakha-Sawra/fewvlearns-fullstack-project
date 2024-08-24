import Jane from './assets/testimonials-images/jane.jpg'
import Chris from './assets/testimonials-images/chris.jpg'
import Leslie from './assets/testimonials-images/Leslie.jpg'
import Mike from './assets/testimonials-images/mike.jpg'
const people = [
    {
      name: 'Leslie Alexander',
      role: 'Front-End Developer',
      imageUrl: Leslie,
    },
    {
      name: 'Jane Cooper',
      role: 'AWS Certified Solutions Architect',
      imageUrl: Jane,
    },
    {
      name: 'Mike Jhonson',
      role: 'Terraform Expert',
      imageUrl: Mike,
    },
    {
      name: 'Emily Davis',
      role: 'Backed Developer / DevOps Engineer',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Chris Wilson',
      role: 'Software Engineer',
      imageUrl:Chris,
    },
  ]
  
  export default function About() {
    return (
      <div className="pt-36">
      <div className="mx-auto container text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">Our dedicated team</h2>
        <p className="mt-6 text-gray-300">
          FewvLearns has a team of passionate individuals who are dedicated to helping you learn new skills and advance your career.
        </p>
      </div>
      <div className="mx-auto flex justify-center items-center mt-12 max-w-6xl gap-x-8 gap-y-20 px-6 lg:px-8">
        <ul role="list" className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex flex-col items-center gap-x-6 sm:flex-row bg-[#001313] shadow-sm shadow-green-300 md:px-8 rounded-2xl md:py-8 hover:shadow-green-300 transform transition-transform duration-300 hover:scale-105 p-4">
                <img alt={person.name} src={person.imageUrl} className="h-24 w-24 rounded-full" />
                <div className="text-center sm:text-left">
                  <h3 className="mt-4 text-base font-semibold leading-7 tracking-tight text-green-300 sm:mt-0">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-gray-300">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    )
  }
  