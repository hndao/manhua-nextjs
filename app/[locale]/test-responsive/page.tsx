import { useTranslations } from 'next-intl';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

/**
 * Test page to demonstrate responsive component architecture
 * Visit: http://localhost:3000/en/test-responsive
 * 
 * Resize your browser to see different layouts:
 * - Mobile: < 768px
 * - Tablet: 768px - 1439px
 * - Desktop: >= 1440px
 */

function MobileDemo() {
  return (
    <div className="bg-green-100 border-4 border-green-500 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">📱 Mobile Layout</h2>
      <p className="text-green-700">
        You are viewing the <strong>mobile</strong> version of this component.
      </p>
      <p className="text-sm text-green-600 mt-2">
        Screen width: &lt; 768px
      </p>
      <div className="mt-4 space-y-2">
        <div className="bg-green-200 p-3 rounded">Compact layout</div>
        <div className="bg-green-200 p-3 rounded">Stacked elements</div>
        <div className="bg-green-200 p-3 rounded">Touch-friendly</div>
      </div>
    </div>
  );
}

function TabletDemo() {
  return (
    <div className="bg-orange-100 border-4 border-orange-500 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-orange-800 mb-4">📱 Tablet Layout</h2>
      <p className="text-orange-700">
        You are viewing the <strong>tablet</strong> version of this component.
      </p>
      <p className="text-sm text-orange-600 mt-2">
        Screen width: 768px - 1439px
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-orange-200 p-3 rounded">Balanced layout</div>
        <div className="bg-orange-200 p-3 rounded">Grid system</div>
        <div className="bg-orange-200 p-3 rounded">Medium spacing</div>
        <div className="bg-orange-200 p-3 rounded">Optimized</div>
      </div>
    </div>
  );
}

function DesktopDemo() {
  return (
    <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-8">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">🖥️ Desktop Layout</h2>
      <p className="text-blue-700 text-lg">
        You are viewing the <strong>desktop</strong> version of this component.
      </p>
      <p className="text-sm text-blue-600 mt-2">
        Screen width: &gt;= 1440px
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-200 p-4 rounded">Spacious layout</div>
        <div className="bg-blue-200 p-4 rounded">Rich interactions</div>
        <div className="bg-blue-200 p-4 rounded">Hover effects</div>
        <div className="bg-blue-200 p-4 rounded">Large images</div>
        <div className="bg-blue-200 p-4 rounded">More details</div>
        <div className="bg-blue-200 p-4 rounded">Full features</div>
      </div>
    </div>
  );
}

export default function TestResponsivePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎨 Responsive Component Test
          </h1>
          <p className="text-gray-600 mb-4">
            This page demonstrates the responsive component architecture. 
            Resize your browser window to see different layouts.
          </p>
          
          <div className="bg-gray-100 rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Breakpoints:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>📱 <strong>Mobile:</strong> &lt; 768px (375px base)</li>
              <li>📱 <strong>Tablet:</strong> 768px - 1439px</li>
              <li>🖥️ <strong>Desktop:</strong> &gt;= 1440px</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Open your browser's DevTools (F12) and use the 
              responsive design mode to test different screen sizes.
            </p>
          </div>
        </div>

        {/* Responsive Demo */}
        <ResponsiveContainer
          mobile={<MobileDemo />}
          tablet={<TabletDemo />}
          desktop={<DesktopDemo />}
        />

        {/* Implementation Code */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Implementation</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';

export default function MyComponent() {
  return (
    <ResponsiveContainer
      mobile={<MobileLayout />}
      tablet={<TabletLayout />}
      desktop={<DesktopLayout />}
    />
  );
}`}
          </pre>
        </div>

        {/* Documentation Links */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Documentation</h2>
          <ul className="space-y-2">
            <li>
              <a href="/RESPONSIVE_COMPONENTS_GUIDE.md" className="text-blue-600 hover:underline">
                📖 Responsive Components Guide
              </a>
            </li>
            <li>
              <a href="/RESPONSIVE_IMPLEMENTATION_SUMMARY.md" className="text-blue-600 hover:underline">
                📋 Implementation Summary
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

