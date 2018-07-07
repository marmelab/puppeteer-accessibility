import { analyzeAccessibility } from './accessibility';
import { FAST_DEVICE, MEDIUM_DEVICE, POOR_DEVICE, getSimplePagePerformanceMetrics, getDetailedPagePerformanceMetrics } from './performances';

describe('Home page', () => {
    it('should not have accessibility issues', async () => {
        await page.setViewport({ width: 1280, height: 1024 });
        await page.goto('http://localhost:5000', { waitUntil: 'load' });
        const accessibilityReport = await analyzeAccessibility(
            page,
            `home.accessibility.png`,
        );

        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    });

    describe('Performance', () => {
        it('should have be interactive in less than 1 second on fast device', async () => {
            const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:5000', FAST_DEVICE);
            expect(metrics).toBeInteractiveUnder(1000);
        });

        it('should have be interactive in less than 1 second on medium device', async () => {
            const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:5000', MEDIUM_DEVICE);
            expect(metrics).toBeInteractiveUnder(1000);
        });

        it('should have be interactive in less than 1 second on poor device', async () => {
            const metrics = await getSimplePagePerformanceMetrics(page, 'http://localhost:5000', POOR_DEVICE);
            expect(metrics).toBeInteractiveUnder(1000);
        });

        it('should have its first meaningful paint in less than 1 second on fast device', async () => {
            const metrics = await getDetailedPagePerformanceMetrics(page, 'http://localhost:5000', FAST_DEVICE);
            expect(metrics).hasItsFirstMeaningfulPaintUnder(500);
        });

        it('should have its first meaningful paint in less than 1 second on medium device', async () => {
            const metrics = await getDetailedPagePerformanceMetrics(page, 'http://localhost:5000', MEDIUM_DEVICE);
            expect(metrics).hasItsFirstMeaningfulPaintUnder(500);
        });

        it('should have its first meaningful paint in less than 1 second on poor device', async () => {
            const metrics = await getDetailedPagePerformanceMetrics(page, 'http://localhost:5000', POOR_DEVICE);
            expect(metrics).hasItsFirstMeaningfulPaintUnder(500);
        });
    });
});
