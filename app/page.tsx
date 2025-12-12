import { Container } from '@/components/layout';

export default function Home() {
  return (
    <div className="bg-gray-50 py-8">
      <Container>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">
            欢迎来到漫画平台 / Welcome to Manhua Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Layout system is working! Header and Footer are now visible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">✅ Task 1</h2>
              <p className="text-gray-600">Project structure created</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">✅ Task 2</h2>
              <p className="text-gray-600">Tailwind CSS configured</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">✅ Task 3</h2>
              <p className="text-gray-600">Layout system built</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">✅ Task 4</h2>
              <p className="text-gray-600">Mock data created</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">🔄 Task 5</h2>
              <p className="text-gray-600">Implementing pages...</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">⏳ Task 6</h2>
              <p className="text-gray-600">Testing responsive design</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
